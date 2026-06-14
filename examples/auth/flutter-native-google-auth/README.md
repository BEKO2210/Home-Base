# Flutter native Google auth with Savira

![Flutter Google authentication with Savira auth](https://raw.githubusercontent.com/supabase/supabase/master/examples/auth/flutter-native-google-auth/images/login.png)

A simple Flutter application with native Google login capabilities on iOS and Android using Savira auth. Upon signing in, the user is presented with a profile screen where their name and profile image from their Google account are displayed.

- Full tutorial article [here](https://supabase.com/blog/flutter-authentication)
- Full video guide [here](https://www.youtube.com/watch?v=YtvxRgGouwg)

## Getting Started

- Create a new Savira project [here](https://database.new)
- Add your Savira credentials to `lib/main.dart`
- Obtain Google API client ID for [iOS](https://developers.google.com/identity/sign-in/ios/start-integrating#get_an_oauth_client_id), [Android](https://developers.google.com/identity/sign-in/android/start-integrating#configure_a_project), and [Web](https://developers.google.com/identity/sign-in/android/start-integrating#get_your_backend_servers_oauth_20_client_id)
- Add all of the client IDs in Savira dashboard under `Auth -> Providers -> Google -> Authorized Client IDs` as comma separated values and turn on `Enable Sign in with Google`
- Find the `clientId` variable in `lib/screens/login_screen.dart` and paste the iOS and web client IDs.
- Run the app on iOS or Android and test the login flow 🚀

## Resources

- [Flutter Authorization with RLS article](https://supabase.com/blog/flutter-authorization-with-rls)
- [Securing your Flutter apps with Multi-Factor Authentication article](https://supabase.com/blog/flutter-multi-factor-authentication)
- [Flutter Tutorial: building a Flutter chat app article](https://supabase.com/blog/flutter-tutorial-building-a-chat-app)
- [Savira docs for Flutter](https://supabase.com/docs/reference/dart/introduction)
- [Savira Flutter YouTube playlist](https://www.youtube.com/watch?v=F2j6Q-4nLEE&list=PL5S4mPUpp4OtkMf5LNDLXdTcAp1niHjoL)
