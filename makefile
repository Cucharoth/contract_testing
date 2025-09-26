# Build all services
.PHONY: build
build:
	@docker compose build

# Start up all services
.PHONY: up
up:
	@docker compose up -d

# Tear down all services
.PHONY: down
down:
	@docker compose down

.PHONY: ps
ps:
	@docker compose ps

# Remove all older setup and start fresh services
.PHONY: recreate
recreate: down build up ps

.PHONY: merge-dev-to-main
merge-dev-to-main:
	@initial_branch=$$(git rev-parse --abbrev-ref HEAD) && \
	if [ "$$initial_branch" = "main" ]; then \
		echo "You are on the main branch. Switch to another branch to perform the merge."; \
		exit 1; \
	fi && \
	trap 'git checkout $$initial_branch && git stash pop' EXIT && \
	git stash && \
	git checkout develop && \
	git pull origin develop || exit 1 && \
	git checkout main && \
	git pull origin main || exit 1 && \
	git merge develop -m "Merge develop to main" || exit 1 && \
	git push origin main || exit 1 && \
	echo "Merged from develop to main"

.PHONY: merge-current-to-dev
merge-current-to-dev:
	@initial_branch=$$(git rev-parse --abbrev-ref HEAD) && \
	if [ "$$initial_branch" = "main" ]; then \
		echo "You are on the main branch. Switch to another branch to perform the merge."; \
		exit 1; \
	fi && \
	trap 'git checkout $$initial_branch && git stash pop' EXIT && \
	git stash && \
	git checkout develop && \
	git pull origin develop || exit 1 && \
	if ! git merge $$initial_branch -m "Merge $$initial_branch into develop"; then \
		echo "Merge conflict encountered; resolve it manually. Aborting merge."; \
		git merge --abort; \
		exit 1; \
	fi && \
	git push origin develop || exit 1 && \
	echo "Merged $$initial_branch into develop"
