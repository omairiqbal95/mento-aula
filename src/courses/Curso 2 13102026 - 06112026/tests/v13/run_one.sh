#!/usr/bin/env bash
set -euo pipefail
u="$1"; p="$2"; units="$3"
tag="$(echo "${u}_${units}" | tr ', ' '__')"
json="accounts_${u}.json"
state="state_${tag}.sqlite"
printf '[\n  {"username": "%s", "password": "%s"}\n]\n' "$u" "$p" > "$json"
python mentoaula_multi_user_v13_working.py \
  --accounts "$json" \
  --units "$units" \
  --answer-delay 0 \
  --test-delay 0 \
  --launch-interval 0 \
  --concurrency 1 \
  --state "$state"
