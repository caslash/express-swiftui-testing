//
//  DataService.swift
//  People
//
//  Created by Cameron Slash on 11/22/24.
//

import Combine
import Factory
import Foundation
import Observation

public protocol IDataService {
    var people: [Person] { get }
    
    init()
    
    func fetchPeople()
    func fetchPerson(id: UUID) -> Person?
    func addPerson(_ person: Person, completion: @escaping (Bool) -> Void)
    func updatePerson(_ person: Person, completion: @escaping (Bool) -> Void)
    func deletePerson(_ person: Person, completion: @escaping (Bool) -> Void)
}

@Observable
public class DataService: IDataService {
    @ObservationIgnored @Injected(\.authService) private var authService: any IAuthService

    public var people: [Person] = []
    
    private let baseURL: URL = .init(string: "http://localhost:3000")!
    
    private var cancellables = Set<AnyCancellable>()
    
    public required init() {
        self.fetchPeople()
    }
    
    private func createRequest(path: String, method: String) -> URLRequest {
        return createRequest(path: path, method: method, body: Optional<Data>.none)
    }
    
    private func createRequest<T: Encodable>(path: String, method: String, body: T? = nil) -> URLRequest {
        var request = URLRequest(url: baseURL.appendingPathComponent(path))
        request.httpMethod = method
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.setValue("Bearer \(self.authService.jwt ?? "")", forHTTPHeaderField: "Authorization")
        if let body { request.httpBody = try? JSONEncoder().encode(body) }
        return request
    }
    
    public func fetchPeople() {
        let request = createRequest(path: "person", method: "GET")
        
        URLSession.shared.dataTaskPublisher(for: request)
            .map(\.data)
            .decode(type: [Person].self, decoder: JSONDecoder())
            .receive(on: DispatchQueue.main)
            .sink(receiveCompletion: { print("completion: \($0)") }, receiveValue: { self.people = $0 })
            .store(in: &cancellables)
    }
    
    public func fetchPerson(id: UUID) -> Person? {
        let request = createRequest(path: "person/\(id)", method: "GET")
        
        var person: Person?
        
        URLSession.shared.dataTaskPublisher(for: request)
            .map(\.data)
            .decode(type: Person.self, decoder: JSONDecoder())
            .receive(on: DispatchQueue.main)
            .sink(receiveCompletion: { print("completion: \($0)") }, receiveValue: { person = $0 })
            .store(in: &cancellables)
        
        return person
    }
    
    public func addPerson(_ person: Person, completion: @escaping (Bool) -> Void) {
        let request = createRequest(path: "person", method: "POST", body: person)
        
        URLSession.shared.dataTaskPublisher(for: request)
            .tryMap { output in
                guard let response = output.response as? HTTPURLResponse,
                      (200...299).contains(response.statusCode) else {
                    return false
                }
                return true
            }
            .receive(on: DispatchQueue.main)
            .sink(receiveCompletion: { completionEvent in
                if case .failure(_) = completionEvent {
                    completion(false)
                }
            }, receiveValue: { success in
                if success { self.people.append(person) }
                completion(success)
            })
            .store(in: &cancellables)
    }
    
    public func updatePerson(_ person: Person, completion: @escaping (Bool) -> Void) {
        let request = createRequest(path: "person/\(person.id)", method: "PUT", body: person)
        
        URLSession.shared.dataTaskPublisher(for: request)
            .tryMap { output in
                guard let response = output.response as? HTTPURLResponse,
                      (200...299).contains(response.statusCode) else {
                    return false
                }
                return true
            }
            .receive(on: DispatchQueue.main)
            .sink(receiveCompletion: { completionEvent in
                if case .failure(_) = completionEvent {
                    completion(false)
                }
            }, receiveValue: { success in
                if success {
                    let index = self.people.firstIndex(of: person)!
                    self.people[index] = person
                }
                completion(success)
            })
            .store(in: &cancellables)
    }
    
    public func deletePerson(_ person: Person, completion: @escaping (Bool) -> Void) {
        let request = createRequest(path: "person/\(person.id)", method: "DELETE")
        
        URLSession.shared.dataTaskPublisher(for: request)
            .tryMap { output in
                guard let response = output.response as? HTTPURLResponse,
                      (200...299).contains(response.statusCode) else {
                    return false
                }
                return true
            }
            .receive(on: DispatchQueue.main)
            .sink(receiveCompletion: { completionEvent in
                if case .failure(_) = completionEvent {
                    completion(false)
                }
            }, receiveValue: { success in
                if success {
                    let index = self.people.firstIndex(of: person)!
                    self.people.remove(at: index)
                }
                completion(success)
            })
            .store(in: &cancellables)
    }
}
