---
title: "Hardening Docker Daemon configs"
date: 2026-07-07T16:40:00+03:00
tags:
  - Docker
  - Cybersecurity
  - Sysadmin
---
Today I learned about disabling the docker userland-proxy to improve routing performance and restrict open port configurations by setting `"userland-proxy": false` inside `/etc/docker/daemon.json`. This forces Docker to use NAT rules instead of spawning proxy processes.
