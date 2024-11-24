//
//  MockDataService.swift
//  People
//
//  Created by Cameron Slash on 11/23/24.
//

import Foundation
import Observation

@Observable
public class MockDataService: IDataService {
    public var people: [Person] = []
    
    public required init() {
        self.fetchPeople()
    }
    
    public func fetchPeople() {
        self.people = [
            .init(name: "Cameron", age: 24),
            .init(name: "John", age: 36),
            .init(name: "Marcus", age: 26)
        ]
    }
    
    public func fetchPerson(id: UUID) -> Person? {
        return self.people.first(where: { $0.id == id })
    }
    
    public func addPerson(_ person: Person, completion: @escaping (Bool) -> Void) {
        self.people.append(person)
        completion(true)
    }
    
    public func updatePerson(_ person: Person, completion: @escaping (Bool) -> Void) {
        let index = self.people.firstIndex(of: person)
        self.people[index!] = person
        completion(true)
    }
    
    public func deletePerson(_ person: Person, completion: @escaping (Bool) -> Void) {
        let index = self.people.firstIndex(of: person)
        self.people.remove(at: index!)
        completion(true)
    }
}
