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

![Logo](docs/readme_images/logo-readme.jpg)

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

![Contact Page](docs/readme_images/footer-readme.jpg)

## Design

### Main Screen Pre Design

![Main Screen Pre Design](docs/readme_images/home-frame.jpg)

### About us Pre Design

![Battle Screen Pre Design](docs/readme_images/battle-screen.jpg)

## Technologies

- HTML: The structure of the website.
- CSS: Styling using custom CSS.
- JavaScript: Backend Development
- CodeAnywhere.com: Online IDE.
- Visual Studio Code: Local IDE.
- GitHub: Source code hosting and deployment.
- Git: Version control.
- Font Awesome: Icons for social media links.
- Iloveimg.com: Image size reduction.
- Cloudconvert: Image format conversion.
- Favicon.io: Favicon creation.- 
- Canvas: Wireframes/Pre-design/
- Leonardo.ai: AI Image Generator

## Future Enhancements

- Implementation of Status distribution to add more interaction with the game
- Dungeon expansion and new monsters
- Create an infinity loop between the missions increasing the dungeon dificulty
- Add more than 1 monster per dungeon to make it more interactive
- 

## Testing

### User Interaction Feedback

- The website has been tested the response changing the sizes and using navigation bar on follow browsers: Chrome, Microsoft Edge,Opera, Firefox.
- For mobile test, it has been tested using Google Chrome Devtools, also tested on my personal mobile Xiami 11 pro. 
- Responsive design on standard screen sizes using devtools device toolbar.
- To the game content testing, have been sent for a few people to test it and taken in consideration feedbacks and implemented on the game, bellow the most relevant information.

- User 1 feedback:
  1. When finish the battle, it go back to the main screen, would be nice to have an option to keep inside the dungeon.
    * Feature added.
  ![Feedback Restart Dungeon](docs/readme_images/feedback-onea.jpg)
  2. Globin can be killed infinity times and so you can take infinity Health potion and kill the bigger monsters easily. 
    * Added a minimum power for next dungeons. 
    ![Feedback minimum power](docs/readme_images/minpower.jpg) 
    * Added maximum power to enter dungeon I.
    ![Feedback maximum power](docs/readme_images/maxpower.jpg)
  * Amount time played: More than 30 minutes
  * Finished the game?: Yes
  * Gamming experience: Yes

- User 2 feedback: 
  1. When uses health potion with full hitpoints it still use the potion, also showed the message had been healed x amount of points. 
    * Added condition to limit the use of potion if hitpoits are full.
    ![Feedback health potion](docs/readme_images/fullhp.jpg)
  * Amount time played: More than 30 minutes
  * Finished the game?: No
  * Gamming experience: No

- User 3 feedback:
  1. The user found a bug if the player die when cancel the prompt and click to attack your life would keep going down.
  * Added to the damage function a condition to life not go lower than zero.
  ![Attack Button logic](docs/readme_images/hpminimum.jpg)

  * Also, added a few conditions to the attack buttom where it only can be activated to attack when player is alive and the monster in case the player cancel the alert if he click to attack again will show the pop up to continue on the dungeon or leave.
  ![Attack Button logic](docs/readme_images/attack-button-logic.jpg)
  * Amount time played: More than 30 minutes.
  * Finished the game?: No.
  * Gamming experience: Yes.

- User 4 feedback:
  1. The user never had contact with RPG or any game so did not understand the game objective
    * Added the How to play button, giving basic information of the game objective.
    ![Instructions](docs/readme_images/instructions.jpg)
  * Amount time played: Less than 30 minutes.
  * Finished the game?: No.
  * Gamming experience: No.

- User 5 feedback:
 1. User suggest to change the action buttons as it was not matching with the screen design and increase the text size.
    * Using CSS create more medieval color for the buttons and limit it size so do not take all width for bigger screens, selected better colour to have more contrast.
  ![Old/New Action buttons](docs/readme_images/buttons-feedback.jpg)
  * Amount time played: Less than 30 minutes.
  * Finished the game?: No.
  * Gamming experience: yes.
  
The game dynamic has been tested for 12 people, also I have played the game more than 5 hours looking for bugs and to see if was possible to finish it, with a good strategy and luck it is possible.

### Debbugging 
  - For debugging, the JavaScript code has been using `console.log` together with the Google Developer Tools to help identify bugs, loops, and condition interactions.. 
 ![Console.log](docs/readme_images/console-log.jpg)
 ![Developer Tools](docs/readme_images/devtools.jpg)


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
