import json
import random

# Read in the GeoJSON file
with open('countries.geojson') as f:
    countries = json.load(f)

# Create an empty dictionary
country_dict = {}

# Loop through each feature in the GeoJSON file
for feature in countries['features']:
    # Get the name of the country
    country_name = feature['properties']['ADMIN']

    # Assign a random number between 100-200 to the country
    country_dict[country_name] = random.randint(100, 200)

sentiment_dict = {'positive': 0, 'negative': 0, 'neutral': 0}

for feature in countries['features']:
    sentiment_dict['positive'] = random.randint(100, 200)
    sentiment_dict['negative'] = random.randint(200, 300)
    sentiment_dict['neutral'] = random.randint(400, 500)

# Loop through each feature in the GeoJSON file
for feature in countries['features']:
    # Extract the country name
    country_name = feature['properties']['ADMIN']
    # Look up the tweet count in the dictionary
    count = country_dict.get(country_name)
    # Add the tweet count as a property to the feature
    feature['properties']['tweet_count'] = count
    
    feature['properties']['sentiment'] = sentiment_dict

    

# Write out the modified GeoJSON data
with open('countries_with_count.geojson', 'w') as f:
    json.dump(countries, f)
# import json
# with open('countries_with_count.geojson') as f:
#     countries = json.load(f)

# for feature in countries['features']:
#     print(feature['properties']['tweet_count'])




