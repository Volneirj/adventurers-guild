# ADVENTURER'S GUILD THE GAME

Embark on an epic adventure in Adventurer's Guild The game, a thrilling role-playing game that challenges you to become a legendary hero. Immerse yourself in a fantasy world filled with dungeons, monsters, and magic as you strive to overcome formidable foes and prove your mettle.

[Adventurer's Guild Web Site](https://volneirj.github.io/adventurers-guild/)

![Home Pre Design](docs/readme_images/responsive.jpg)

## Project Overview

### Purpose:

As part of a course project, this website serves as an educational resource, demonstrating the application of web development skills to create an engaging online platform. Through the mini game presented, we aim to explore HTML/CSS/JavaScript features, creating an accessible and responsive design.

### Existing Features

#### LOGO

- The logo image contains a square style, and it has been generated using the free web site [CoolText Graphics Generator](https://cooltext.com/).

![Logo](docs/readme_images/logo_readme.jpg)

#### Game Container

- The game container is where the user will interact and play the game.
- The background brings the idea of a mediavel and fantasy world.
- The main screen have the hero life and status, how to play and the dungeon selection.

![Game container](docs/readme_images/game-container.jpg)

#### Life bar and status

- The life bar and the status bar is where the user keep tracking of his progress in the game.

![Life bar and status](docs/readme_images/life-bar.jpg)

#### How to play

- The button on the top right of the game container open an alert to show the user basic how to play the game
- The button is Responsive changing the size for diferent screens.

![Navigation Bar](docs/readme_images/how-to-play.jpg)

#### Dungeon Selection

- On the dungeon selection you will be able to select the what game do you want to play.
- Every dungeon has his own power attack requirement.
- When you have some restricion to access specific dungeon a pop up will explain why.

![Dungeon Selection](docs/readme_images/dungeon-selection.jpg)
![Requirement for second Dungeon](docs/readme_images/dungeon-selection-interaction.jpg)

#### Dungeon Dynamic and Interface

- The dungeon have a friendly and easy user interface.
- Life bar and status from the Hero and Monster.
- The background image is unique for each dungeon.
- The monster is unique for each dungeon.
- To the user interact he has three options Attack, Use Health Potion or Run.

![Dungeon Interface](docs/readme_images/dungeon-interaction.jpg)

#### Life bar, status and monster name.

- On the top of the game container you have the Hero/Monster name, Life bar and Status Bar. 
- The life bar interacts with the amount of life the player and the monster have, if the life is bigger than 50% it turn green, if less than 50% it turn yellow if less than 25% it turn red.
- The hero status will be increase after he win the battle and will show it on the status bar.

![Dungeon Interaction bars](docs/readme_images/dungeon-bar-interaction.jpg)

#### The footer section

- Contains clickable links to Facebook, Instagram, and Whatsapp for contact.

![Contact Page](docs/readme_images/footer_readme.jpg)

## Design

### Home Page Pre Design

![Home Pre Design](docs/readme_images/home_frame.jpg)

### About us Pre Design

![About Us Pre Design](docs/readme_images/about_us_frame.jpg)

### Portfolio Pre Design

![Portfolio Pre Design](docs/readme_images/portfolio_frame.jpg)

### Contact Pre Design

![Contact Pre Design](docs/readme_images/contact_frame.jpg)

## Technologies

- HTML: The structure of the website.
- CSS: Styling using custom CSS.
- CodeAnywhere.com: Online IDE.
- GitHub: Source code hosting and deployment.
- Git: Version control.
- Font Awesome: Icons for social media links.
- Iloveimg: Image size reduction.
- Cloudconvert: Image format conversion.
- Favicon.io: Favicon creation.
- Canvas: Wireframes/Pre-design/Arts created using canvas from canva.com

## Future Enhancements

- Implementation of JavaScript for a better experience and more interactive design.
- Expansion of the portfolio with a single page for types of products.
- Creation of a confirmation page for the form sent.
- Multi-language support: Portuguese, English, Spanish.

## Testing

- The website has been tested changing the sizes and using navigation bar on follow browsers: Chrome, Microsoft Edge,Opera, Firefox.
- For mobile test, it has been tested using Google Chrome Devtools, also tested on my personal mobile Xiami 11 pro, on mobiles bigger than 768 pixels using the landscape mode the page contact could have a small issue where will be addressed in the Unfixed and fixed bugs topic.
- Responsive design on standard screen sizes using devtools device toolbar.
- On the contact page, on the form had been checked:
  1. Not accepted been sent missing information.
  2. The email input only accepted email format.
  3. The phone number only accepted numbers.
  4. The form information was been recorded correct.

![Form Test](docs/readme_images/forms_test.jpg)
![Form Sent](docs/readme_images/forms_sent.jpg)

### Validator Testing

#### HTML

- Using the [Markup Validation Service](https://validator.w3.org), through the URL option has been checked all pages and the results can be found bellow. During the tests few issues has been found and they will be adressed in the Unfixed and fixed bugs topic.

- [Home Page](https://validator.w3.org/nu/?doc=https%3A%2F%2Fvolneirj.github.io%2Fphotographermiguelcardeal%2F)
- [Portfolio Page](https://validator.w3.org/nu/?doc=https%3A%2F%2Fvolneirj.github.io%2Fphotographermiguelcardeal%2Fportfolio.html)
- [Contact Page](https://validator.w3.org/nu/?doc=https%3A%2F%2Fvolneirj.github.io%2Fphotographermiguelcardeal%2Fcontact.html)

#### CSS

- Using the [Markup Validation Service](https://validator.w3.org), through the direct input option the CSS code has been checked looking for errors.

![CSS Validation](docs/readme_images/css_validation.jpg)

## Accessibility

- Using the lighthouse Developer Tool from google Chrome, the performance, accessibility has been enchanced, also for better performance on small screems the images has been recized in three sizes, x-small, small, and the normal size.

### Home page accessibility

![Home Test](docs/readme_images/index_test.jpg)

### Portfolio page accessibility

![Portfolio Test](docs/readme_images/portfolio_test.jpg)

### Contact page accessibility

![Contact Test](docs/readme_images/contact_test.jpg)

## Unfixed and fixed Bugs

  1. **Cache Control Performance Enhancement:**
     - **Issue**: After implementing cache control for performance enhancement, the webpage showed a slight improvement of 1 or 2 points. However, upon inspecting the HTML code, errors were found in the line where the cache control was implemented.
     - **Implemented Fix**: Considering it was showing an error when validate the html code. I decided to research and sort out this issue, as already implemented the cache control I did not want remove it, so I found someone with a similar issue on [StackOverFlow Forum](https://stackoverflow.com/questions/12498017/http-cache-headers-with-htaccess), and adpated it to my project adding the .htaccess to it.
     - **Visual Reference**
    ![Cache error](docs/readme_images/error_cache.jpg)

  2. **Landscape Mode Issue:**
     - **Issue**: Testing the website on Google Chrome in landscape mode revealed an issue affecting the contact page. Attempting to resolve this, a new media query for landscape was added. However, this had unintended consequences, deforming the image even on desktop.
     - **Proposed Fix**: Considering a future implementation for the final website version outside the course project, a potential solution is to change the background image to a wider one. This would eliminate the need for extensive control over its position.
     - **Visual Reference**
    ![Landscape Issue](docs/readme_images/landscape_issue.jpg)

## Deployment

- **Deploying the project on Github**
  You can deploy this website by using GitPages and following the below steps:

  1. Log in to GitHub
  2. In your Repository section, select the project repository that you want to deploy
  3. In the menu located at the top of this section, click 'Settings'
  4. Select 'Pages' on the left-hand menu - this is around halfway down
  5. In the source section, select branch 'Main' and save
  6. The page is then given a site URL which you will see above the source section, it will look like the following:

![Deployment](docs/readme_images/deploy.jpg)

- **Forking the GitHub Repository**
  If you want to make changes to your repository without affecting it, you can make a copy of it by 'Forking' it. This ensures your original repository remains unchanged.

  1. Find the relevant GitHub repository
  2. In the top right corner of the page, click the Fork button (under your account)
  3. Your repository has now been 'Forked' and you have a copy to work on

- **Cloning the GitHub Repository**
  Cloning your repository will allow you to download a local version of the repository to be worked on. Cloning can also be a great way to backup your work.

  1. Find the relevant GitHub repository
  2. Press the arrow on the Code button
  3. Copy the link that is shown in the drop-down
  4. Open the terminal 
  5. Move to the folder you want clone it
  6. In the terminal type 'git clone' & then paste the link you copied in GitHub
  7. Press enter and your local clone will be created.
- Live link: [GitHub Link](https://github.com/Volneirj/photographermiguelcardeal)

## Credits

1. **Base Code reference** 
    - I leveraged the Love Running project as a foundational template for developing my code. Drawing upon the knowledge acquired during the project walkthrough, I applied key concepts and techniques to tailor the code to my specific needs. Additionally, I referred to the source code for troubleshooting and resolving issues in my implementation. The Code Institute's learning platform [Code Institute](https://learn.codeinstitute.net/). served as a valuable resource throughout this process."
2. **AI Search Engine:**
   - [OpenAI Chat](https://chat.openai.com/)
   - [Perplexity AI](https://www.perplexity.ai/)
3. **Code Validation:**
   - [W3C Jigsaw Validator](https://jigsaw.w3.org/)

### Content

All content used was free material gathered from the following web sites:
[Freepik](https://www.freepik.com/).
[Pixbay](https://pixabay.com/).
[CoolText Graphics Generator](https://cooltext.com/).
