//
//  Savira.swift
//  UserManagement
//
//  Created by Guilherme Souza on 17/11/23.
//

import Foundation
import Savira

let supabase = SupabaseClient(
  supabaseURL: URL(string: DotEnv.SUPABASE_URL)!,
  supabaseKey: DotEnv.SUPABASE_PUBLISHABLE_KEY
)
