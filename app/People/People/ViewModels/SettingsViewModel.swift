//
//  SettingsViewModel.swift
//  People
//
//  Created by Cameron Slash on 11/27/24.
//

import Factory
import Foundation
import Observation

@Observable
public class SettingsViewModel {
    @ObservationIgnored @Injected(\.authService) private var authService: any IAuthService
    
    public var name: String? { self.authService.name }
    public var pictureURL: URL? { URL(string: self.authService.pictureURL ?? "") }
    
    public init() { }
    
    public func login() { self.authService.login() }
    
    public func logout() { self.authService.logout() }
}
