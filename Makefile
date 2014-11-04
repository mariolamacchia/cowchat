make:
	@echo Remove old versions
	rm -rf /usr/local/lib/cowchat
	rm -f /usr/local/bin/cowchat
	@echo Install
	npm install
	mkdir /usr/local/lib/cowchat
	cp -r * /usr/local/lib/cowchat
	ln -s /usr/local/lib/cowchat/cowchat /usr/local/bin/cowchat
	chmod 777 /usr/local/lib/cowchat/app/config.json
	@echo Clean
	rm -rf node_modules
