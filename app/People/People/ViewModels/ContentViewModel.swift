//
//  ContentViewModel.swift
//  People
//
//  Created by Cameron Slash on 11/22/24.
//

import Factory
import SwiftUI
import Observation

@Observable
public class ContentViewModel {
    @ObservationIgnored @Injected(\.dataService) private var dataService: any IDataService
    
    public var people: [Person] { return dataService.people }
    
    public init() { }
    
    public func fetchPeople() {
        self.dataService.fetchPeople()
    }
    
    public func addPerson(_ person: Person, completion: @escaping (_ success: Bool) -> Void) {
        self.dataService.addPerson(person, completion: completion)
    }
    
    public func deletePerson(at indexSet: IndexSet, completion: @escaping (_ success: Bool) -> Void) {
        for index in indexSet {
            self.dataService.deletePerson(self.people[index], completion: completion)
        }
    }
    
    public func deletePerson(_ person: Person, completion: @escaping (_ success: Bool) -> Void) {
        self.dataService.deletePerson(person, completion: completion)
    }
}
