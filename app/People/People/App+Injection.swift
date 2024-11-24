//
//  App+Injection.swift
//  People
//
//  Created by Cameron Slash on 11/22/24.
//

import Factory
import Foundation

extension Container {
    var dataService: Factory<any IDataService> {
        Factory(self) { DataService() }
            .singleton
    }
}
