//
//  Person.swift
//  People
//
//  Created by Cameron Slash on 11/22/24.
//

import Foundation

public class Person: Identifiable, Codable, Equatable {
    public var id: UUID
    public var name: String
    public var age: Int
    
    public init(id: UUID = UUID(), name: String, age: Int) {
        self.id = id
        self.name = name
        self.age = age
    }
    
    public static func == (lhs: Person, rhs: Person) -> Bool {
        lhs.id == rhs.id
    }
}
