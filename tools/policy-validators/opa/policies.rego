package governance

default allow = false

deny[msg] {
  some key
  command := input.commands[key]
  contains(command, "<FILL_FROM_REPO>")
  msg := sprintf("Manifest command %s contains <FILL_FROM_REPO>", [key])
}

deny[msg] {
  some key
  command := input.commands[key]
  contains(command, "<UNKNOWN>")
  msg := sprintf("Manifest command %s contains <UNKNOWN>", [key])
}

allow {
  not deny[_]
}
