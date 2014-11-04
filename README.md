CowChat
=======

CowChat is a simple chat working on terminal that uses a JavaScript version of
Cowsay to bring messages to you.

    Logged
    message from user99
     ___________
    < Hi there! >
     -----------
            \   ^__^
             \  (oo)\_______
                (__)\       )\/\
                    ||----w |
                    ||     ||

    message from tux123
     __________________________________
    < CowChat is the best chat EVER!!! >
     ----------------------------------
       \
        \
            .--.
           |o_o |
           |:_/ |
          //   \ \
         (|     | )
        /'\_   _/`\
        \___)=(___/

    message from squirrel
     _______________________________________________________
    < You can use any "cow" that will bring your message... >
     -------------------------------------------------------
      \
         \
                      _ _
           | \__/|  .~    ~.
           /oo `./      .'
          {o__,   \    {
            / .  . )    \
            `-` '-' \    }
           .(   _(   )_.'
          '---.~_ _ _|


Server is running at
[https://cowchat.herokuapp.com/](https://cowchat.herokuapp.com/).
You can get server's code
[here](https://github.com/mariolamacchia/cowchat-server/).

Install
-------

Clone the repository:

    git clone https://github.com/mariolamacchia/cowchat

Go into the repository directory and run the makefile:

    cd cowchat
    sudo make

Signup

    cowchat signup

Usage
-----

To start listening for messages:

    cowchat start <username> <password>

To send messages (you will need to have an open process listening):

    cowchat send <receiver_username> "<message>"

Other
-----

CowChat still has a lot of bugs. Please feel free to contribute.
