# Nostaljams

## Data Flow

1. Authenticate with Spotify

   The app redirects the user to Spotify's website to authenticate via implicit OAuth. The website then redirects back to Nostaljams with an access token in the URL hash. Nostaljams picks the token off the URL and keeps it in the Redux store.

2. User enters their LastFM username

   When the username is entered, the app fetches their available weekly charts, basically a massive array of timestamp ranges. The available timestamp ranges are then massaged into a date range picker that allows a user to seamlessly choose a range.

3. The user selects a date range to pull data from

   Once a date range is selected, we fetch two of the available LastFM charts for the given range: artists and tracks. We store both of these data sets in the Redux store.

4. Nostaljam generates a playlist

   Nostaljam uses the track and artists to generate a playlist, doing the work to de-duplicate by artist and return a diverse playlist that covers all artists in the weekly-chart-by-artist chart.
