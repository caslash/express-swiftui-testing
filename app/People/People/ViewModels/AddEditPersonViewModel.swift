//
//  AddEditPersonViewModel.swift
//  People
//
//  Created by Cameron Slash on 11/22/24.
//

import Factory
import Foundation
import Observation

@Observable
public class AddEditPersonViewModel {
    @ObservationIgnored @Injected(\.dataService) private var dataService: any IDataService
    
    public var isEditing: Bool
    
    public var person: Person?
    
    public var name: String
    public var age: Int
    
    private var saveCompletion: (_ success: Bool) -> Void
    
    public init(person: Person? = nil, _ completion: @escaping (_ success: Bool) -> Void) {
        self.isEditing = person != nil
        
        self.person = person
        
        self.name = person?.name ?? ""
        self.age = person?.age ?? 18
        
        self.saveCompletion = completion
    }
    
    public func savePerson() {
        if let person {
            let newPerson = Person(id: person.id, name: self.name, age: self.age)
            self.dataService.updatePerson(newPerson) { success in
                self.saveCompletion(success)
            }
        } else {
            let newPerson = Person(name: self.name, age: self.age)
            self.dataService.addPerson(newPerson) { success in
                self.saveCompletion(success)
            }
        }
    }
}
