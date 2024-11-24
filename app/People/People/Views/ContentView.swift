//
//  ContentView.swift
//  People
//
//  Created by Cameron Slash on 11/22/24.
//

import AlertToast
import Factory
import SwiftUI

struct ContentView: View {
    @State private var viewModel: ContentViewModel = .init()
    
    @State private var isPresentingAddSheet: Bool = false
    
    @State private var showToast: Bool = false
    @State private var toastTitle: String?
    @State private var successfulToast: Bool?
    
    var body: some View {
        NavigationStack {
            List {
                ForEach(self.viewModel.people) { person in
                    NavigationLink {
                        AddEditPersonView(person: person) { success in
                            self.successfulToast = success
                            self.toastTitle = success ? "Updated Person" : "Couldn't update person"
                            self.showToast = true
                        }
                    } label: {
                        HStack(alignment: .center) {
                            Text(person.name)
                            
                            Text("\(person.age)")
                                .font(.caption)
                                .foregroundStyle(.gray)
                        }
                    }
                }
                .onDelete { indexSet in
                    self.viewModel.deletePerson(at: indexSet) { success in
                        self.successfulToast = success
                        self.toastTitle = success ? "Deleted Person" : "Couldn't delete person"
                        self.showToast = true
                    }
                }
            }
            .refreshable {
                self.viewModel.fetchPeople()
            }
            .toolbar {
                Button {
                    self.isPresentingAddSheet.toggle()
                } label: {
                    Label("Add", systemImage: "plus")
                }
            }
        }
        .sheet(isPresented: self.$isPresentingAddSheet) {
            NavigationStack {
                AddEditPersonView { success in
                    self.successfulToast = success
                    self.toastTitle = success ? "Added Person" : "Couldn't add person"
                    self.showToast = true
                }
            }
        }
        .toast(isPresenting: $showToast, duration: 2, tapToDismiss: true) {
            AlertToast(displayMode: .banner(.pop), type: self.successfulToast ?? false ? .complete(.green) : .error(.red), title: self.toastTitle)
        } completion: {
            self.toastTitle = nil
            self.successfulToast = false
        }
    }
}

#Preview {
    let _ = Container.shared.dataService.register { MockDataService() }
    ContentView()
}
