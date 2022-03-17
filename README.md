# Gallery App

## Links

- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My design processs

### Built with

- React
- Node.js
- Sass
- Desktop-first workflow
- Unsplash API

### Resources

- Dictionary JSON file: [english-words](https://github.com/dwyl/english-words)
- Unsplash API: [Unsplash Developers](https://unsplash.com/developers)

### Home Page Component

Home is the parent component for the overlay, search, and gallery components.

### Search Component

For the search component, I used two local states. The search value state is changed as the user types into the search input field. If a user searches an invalid word like an empty string or a string that is all numbers or symbols, the input error state will be set to true. A message will be displayed to the user to enter a valid word using the errorMessage() function.

If there are no errors with the search value, the searchHandler() function will be executed when the search button is pressed. Here, the search value is formatted by changing it to lowercase and removing any character that is not a-z using regular expressions. This takes care of the case like "nyl;on" to "nylon."

Next, the formatted word is passed to the spell checker function which will return a valid word if found in the dictionary. If an undefined value is returned, the corrected word will be set to the original search value. For example, if a user searches "playstation", the spell checker function will send back undefined since it is not in the dictionary. But, "playstation" is a valid value for the Unsplash API to return results.

I used Axios to send a get request to the Unsplash API. In the API folder is a server.js file that sets up the axios base url and client-id. After the get request is successfull, the images are set for the gallery list that will display below the search component. If there is an error, a server error message will displayed.

### Spell Checker Implementation

Initially, the search value that is passed to the spell checker will be checked if it is already a valid word. I used a third party dictionary json file to test for validity.

My approach for the spell checker was to replace all vowels in the search value with an asterisk to use it as a pattern. For example, "ceku" would be "c*k*" which will result into "cake". Next, I filter out all the words in the dictionary that matches the length of the search value. After filtering, I loop through the dictionary words and replace the vowels in each word with an asterisk. If the pattern of the dictionary word matches with the search value pattern, I push the valid word to an array.

The function returns the first element of the array of valid words.

### Gallery and Overlay

The gallery that displays the images from Unsplash are broken down into two components, the GalleryList and GalleryCard. The GalleryList component displays all images from the images prop passed down from the parent Home component as cards. Each GalleryCard can be clicked which sets the showOverlay state in the Home component. The Overlay will be shown with the image that was selected. The Overlay can be closed by clicking anywhere on the overlay.
