#!/usr/bin/env bash

set -euo pipefail
IFS=$'\n\t'

# previous_tag() {
#  git describe --tags --abbrev=0 HEAD^
# }

git log --no-merges --format='%w(0,0,2)* %B' --reverse "$(git describe --tags --abbrev=0 HEAD^)..HEAD^" 