# Microsoft Azure AI Hackathon 2021

[Devpost](https://azureai.devpost.com/)


* * *


## week 2 

*2021-03-20*

__objectives__

- create a basic guided meditation bot with bot framework composer and host it
- Add ability to 

* * *

## Saturday 2021-03-13
## week 1 

*2021-03-14*

__objectives__

- create a basic guided meditation bot with bot framework composer and host it

* * *

## Saturday 2021-03-13

**accomplished:**

- bot tutorials:
    - language generation tutorial
    - created a LUIS resource and app
- researched 'knowledge' capabilities of bot


**bot feature ideas:**

- make a knowledge base
    - essentially discover intent, find out what the user wants to know, and find that information
    - present that information [docs](https://docs.microsoft.com/en-us/azure/bot-service/bot-service-design-pattern-knowledge-base?view=azure-bot-service-4.0)
- make the bot ask the user questions such as:
    - what are you thoughts about meditation?
    - what is your experience with meditation?
    - what kind of meditation are you interested in?
- make the bot suggest the best kind of meditation based on the users answers
- Other bot features:
    - answer 'frequently asked questions' on meditation, buddhism, spirituality, zen, religion, mindfulness
    - train AI model on such buddhist texts
    - use LUIS - NLP based intent recognition, combined with 'search' and 'QnA Maker' [Docs](https://docs.microsoft.com/en-us/azure/bot-service/bot-service-design-pattern-knowledge-base?view=azure-bot-service-4.0#luis-and-qna-maker)



* * *

## Friday 2021-03-12

**summary:**

- Researched Bot Framework Composer
- Downloaded repo, and dependencies
    - installed NET Core 3.1
    - updated node js to latest 14.16.0
- Built tutorial echo, and weather chat bots [tutorial](https://docs.microsoft.com/en-us/composer/tutorial/tutorial-get-weather)
- had issue with bot framework emulator not working, no solution found online
    - will leave this for now, as still able to interact with bot in the web chat
- Researched feasibility of deploying to server
    - BFC is a typical web app that is open source and can be deployed to Digital Ocean and served with nginx
- Researched feasibility of converting bot text to speech. Can do with Azure tools.

