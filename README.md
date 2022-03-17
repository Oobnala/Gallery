# Gallery App

## Installation

In order to use the app, you will need your own Client ID key from Unsplash and add it to the project.

```
git clone https://github.com/Oobnala/Gallery.git
npm install
npm start
```

## Links

- Live Site URL: [Gallery Prototype](https://gallery-prototype-d8dd39.netlify.app/)

## My Design Processs

### Built With

- React
- Node.js
- Sass
- Flexbox
- Desktop-first workflow
- Unsplash API

### Resources

- Dictionary JSON file: [english-words](https://github.com/dwyl/english-words)
- Unsplash API: [Unsplash Developers](https://unsplash.com/developers)

### Home Page Component

Home is the parent component for the overlay, search, and gallery components.

- Local State:
  - initialRender: Initially set to true, but switched to false after the first search.
  - images: The images received by a successful get request in Search component.
  - error: Used to determine if there is a server error from the get request.
  - isLoading: Initially set to false, but it is triggered when a search is being made. When the request completes, it is reset to false. This state is for the LoadingSpinner component.
  - showOverlay: An object state that has a "show" property to trigger the overlay image and an "imgURL" property to display the selected image.

### Search Component

The Search Component has an input field and a search button for users to search for images from Unsplash.

- Local state

  - searchVal: The search input value that is changed as the user types in the input field.
  - inputError: This is used as a flag for when a user inputs an invalid search value.

- Functions

  - searchHandler()

    - Executed after the user clicks on the search button.
    - Initially, formats search value to lowercase and removes all characters that is not a-z using regular expressions.
    - Utilizes the the spell checker function.
    - If the spell checker returns undefined, sets the corrected word to the original search value.
    - Sends a get request using Axios to retrieve images from Unsplash and set the images state in the Home component.

  - errorMessage()
    - Returns error message for when a string is empty or invalid.

### Spell Checker Implementation

My approach for implementing the spell checker was to use pattern matching and regular expressions. I used a third party dictionary JSON file.

#### Steps

1. Base case: check if the search value is already a valid word in the dictionary file. If so, return.
2. Create an array that will hold all valid words.
3. Replace all vowels in the search value with an asterisk.

- Example: 'ceku' -> 'c*k*'

4. Filter through the dictionary of words that matches the length of the search value.
5. Loop through the filtered dictionary words, and similarly replace all vowels with an asterisk. If the dictonary words matches the same pattern as the search value, add it to the valid words array.

- Example: 'ceku'
  - Valid words: ['cake', 'coke', 'cuke']

6. Return the first element of the valid words array.

### Gallery

The gallery displays the images from Unsplash and is broken down into two components, the GalleryList and GalleryCard components.

- GalleryList: Displays all images from the images prop passed down from the parent Home component as cards.
- GalleryCard: Each card is hoverable and clickable which will set the showOverlay state in the Home component.

### Overlay

The Overlay will be shown with the image that was selected by the user. This is determined by the showOverlay state in the Home component.

- The Overlay can be closed by clicking anywhere on the overlay.
