//
//  AddEditPersonView.swift
//  People
//
//  Created by Cameron Slash on 11/22/24.
//

import Factory
import SwiftUI

struct AddEditPersonView: View {
    @Environment(\.dismiss) private var dissmiss
    @State private var viewModel: AddEditPersonViewModel
    
    var body: some View {
        Form {
            TextField("Name", text: self.$viewModel.name)
            
            Stepper("\(self.viewModel.age) years old", value: self.$viewModel.age)
        }
        .navigationTitle(self.viewModel.isEditing ? "Edit Person" : "Add Person")
        .toolbar {
            Button {
                self.viewModel.savePerson()
                self.dissmiss.callAsFunction()
            } label: {
                if self.viewModel.isEditing {
                    Text("Save")
                } else {
                    Label("Save", systemImage: "plus")
                }
            }
        }
    }
    
    init(person: Person? = nil, _ completion: @escaping (_ success: Bool) -> Void) {
        self.viewModel = AddEditPersonViewModel(person: person, completion)
    }
}

#Preview("Add Person") {
    let _ = Container.shared.dataService.register { MockDataService() }
    NavigationStack {
        AddEditPersonView() { _ in }
    }
}

#Preview("Edit Person") {
    let _ = Container.shared.dataService.register { MockDataService() }
    NavigationStack {
        AddEditPersonView(person: .init(name: "Cameron", age: 24)) { _ in }
    }
}
