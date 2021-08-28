#!/bin/sh

set -ax

git push

ID="$(basename $(pwd))"
MIRROR="${ID}.mirror"
cd $(dirname $(pwd))

echo "${ID} -> ${MIRROR}"

create_mirror() {
    test -d "${MIRROR}" && return

    git clone --mirror "git@github.com:izatop/${ID}.git" "reform.mirror"

    cd "${MIRROR}"
    git remote set-url --push origin "git@gitlab.com:izatop-github-builds/${ID}.git"
}

mirror() {
    cd "${MIRROR}"
    git fetch -p origin
    git push --mirror
}

create_mirror
mirror
