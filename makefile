.PHONY: check-publish get-latest publish publish-draft

repo_name ?= "blueshift-ui"

# Prompt the user for approval to publish all upated packages to our package registry
check-publish:
	@echo "This is a no-op if run without versioning first (yarn bump). Have you updated the package versions appropriately? [y/N] " && read ans && [ $${ans:-N} = y ]

get-latest:
	@git fetch --force --prune origin "+refs/tags/*:refs/tags/*"
	@git checkout master
	@git pull

# Publish all upated packages to our package registry
# Works together with the `publish` workflow in .github/workflows
publish: get-latest check-publish
	VERSION=$$(node -p "require('./lerna.json').version") && \
	DATE=$$(date +"%F-%H_%M_%S") && \
	gh release create release-packages-$$DATE --title "v$$VERSION" --generate-notes && \
	gh release view release-packages-$$DATE --web

# Create a draft release (doesn't trigger the publish workflow)
publish-draft: get-latest check-publish
	VERSION=$$(node -p "require('./lerna.json').version") && \
	DATE=$$(date +"%F-%H_%M_%S") && \
	gh release create release-packages-$$DATE --draft --title "v$$VERSION" --generate-notes && \
	gh release view release-packages-$$DATE --web
