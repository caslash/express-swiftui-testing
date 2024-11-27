//
//  AuthService.swift
//  People
//
//  Created by Cameron Slash on 11/27/24.
//

import Auth0
import JWTDecode
import Observation
import Foundation

public protocol IAuthService {
    var name: String? { get }
    var pictureURL: String? { get }
    var jwt: String? { get }
    
    init()
    
    func login()
    func logout()
}

@Observable
public class AuthService: IAuthService {
    public var name: String? {
        didSet {
            let encoder = JSONEncoder()
            if let encoded = try? encoder.encode(name) {
                UserDefaults.standard.set(encoded, forKey: "user_name")
            }
        }
    }
    
    public var pictureURL: String? {
        didSet {
            let encoder = JSONEncoder()
            if let encoded = try? encoder.encode(pictureURL) {
                UserDefaults.standard.set(encoded, forKey: "user_picture")
            }
        }
    }
    
    @ObservationIgnored public var jwt: String? {
        didSet {
            if jwt == nil {
                let isDeleted = KeychainHelper.shared.delete(key: "user_jwt")
                switch isDeleted {
                case true: print("JWT deleted from keychain")
                case false: print("JWT failed to delete from keychain")
                }
                
                self.name = nil
                self.pictureURL = nil
                return
            }

            let isSaved = KeychainHelper.shared.save(key: "user_jwt", data: Data(jwt!.utf8))
            switch isSaved {
            case true: print("JWT saved to keychain")
            case false: print("JWT failed to save to kaychain")
            }
            
            guard let jwtToken = try? decode(jwt: jwt ?? "") else { return }
            
            self.name = jwtToken["name"].string
            self.pictureURL = jwtToken["picture"].string
        }
    }
    
    public required init() {
        if let user_name = UserDefaults.standard.data(forKey: "user_name") {
            let decoder = JSONDecoder()
            if let decoded = try? decoder.decode(String.self, from: user_name) {
                self.name = decoded
            }
        }
        
        if let user_picture = UserDefaults.standard.data(forKey: "user_picture") {
            let decoder = JSONDecoder()
            if let decoded = try? decoder.decode(String.self, from: user_picture) {
                self.pictureURL = decoded
            }
        }
        
        if let tokenData = KeychainHelper.shared.load(key: "user_jwt") {
            self.jwt = String(data: tokenData, encoding: .utf8)
        }
    }
    
    public func login() {
        Auth0
            .webAuth()
            .useHTTPS()
            .start { result in
                switch result {
                case .success(let credentials):
                    self.jwt = credentials.idToken
                    print("Obtained credentials: \(credentials)")
                case .failure(let error):
                    print("Failed with: \(error)")
                }
            }
    }
    
    public func logout() {
        Auth0
            .webAuth()
            .useHTTPS()
            .clearSession { result in
                switch result {
                case .success:
                    self.jwt = nil
                    print("Logged out")
                case .failure(let error):
                    print("Failed with: \(error)")
                }
            }
    }
}
