//
//  SettingsView.swift
//  People
//
//  Created by Cameron Slash on 11/26/24.
//

import SwiftUI

struct SettingsView: View {
    @State private var viewModel: SettingsViewModel
    
    var body: some View {
        if let username = viewModel.name,
           let pictureURL = viewModel.pictureURL {
            HStack {
                Text(username)
                
                Button {
                    self.viewModel.logout()
                } label: {
                    Text("Logout")
                }
            }
        } else {
            Button {
                self.viewModel.login()
            } label: {
                Text("Login")
            }
        }
    }
    
    init() {
        self.viewModel = SettingsViewModel()
    }
}

#Preview {
    SettingsView()
}
