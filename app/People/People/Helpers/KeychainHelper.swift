//
//  KeychainHelper.swift
//  People
//
//  Created by Cameron Slash on 11/27/24.
//

import Foundation
import Security

class KeychainHelper {
    static let shared = KeychainHelper()
    
    private init () {}
    
    func save(key: String, data: Data) -> Bool {
        let query = [
            kSecClass: kSecClassGenericPassword,
            kSecAttrAccount: key
        ] as CFDictionary
        SecItemDelete(query)
        
        let attributes = [
            kSecClass: kSecClassGenericPassword,
            kSecAttrAccount: key,
            kSecValueData: data
        ] as CFDictionary
        
        let status = SecItemAdd(attributes, nil)
        return status == errSecSuccess
    }
    
    func load(key: String) -> Data? {
        let query = [
            kSecClass: kSecClassGenericPassword,
            kSecAttrAccount: key,
            kSecReturnData: true,
            kSecMatchLimit: kSecMatchLimitOne
        ] as CFDictionary
        
        var data: AnyObject?
        let status = SecItemCopyMatching(query, &data)
        guard status == errSecSuccess else { return nil }
        return data as? Data
    }
    
    func delete(key: String) -> Bool {
        let query = [
            kSecClass: kSecClassGenericPassword,
            kSecAttrAccount: key
        ] as CFDictionary
        
        let status = SecItemDelete(query)
        return status == errSecSuccess
    }
}
