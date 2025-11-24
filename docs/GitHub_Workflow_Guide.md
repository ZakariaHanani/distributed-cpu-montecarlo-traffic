# GitHub Workflow & Team Collaboration Guide

This document explains **how to work with issues, epics, branches, pull requests, reviews, and the project board** in a clean, professional workflow — exactly like real software engineering teams.

Share this with your teammates to follow the same rules.

---

# 📌 1. Branching Model

Use the following structure:

```
main ← develop ← feature/<issue-number>-short-description
```

### **main**

* Always stable
* Only receives releases or final validated code

### **develop**

* Main working branch
* All features merge here

### **feature/** branches

* Each issue = ONE branch
* Example:

```
feature/4.1-master-registry
feature/9.3-reassign
feature/21.2-flow
```

---

# 📌 2. Working With Issues

Each issue represents **one task = one branch = one pull request**.

### Steps:

1. Pick an issue from the **Project Board → TODO**
2. Assign the issue to yourself
3. Create a branch:

```
git checkout develop
git pull origin develop
git checkout -b feature/<issue-number>-name
```

4. Write ONLY the code required for that issue
5. Commit using Conventional Commits:

```
feat: implement task splitting algorithm
fix: handle worker timeout
chore: update documentation
```

6. Push your branch:

```
git push -u origin feature/<branchname>
```

7. Open a Pull Request (PR)
8. Request reviews
9. After approval → merge
10. Issue closes automatically

---

# 📌 3. Pull Requests (PRs)

Each PR must:

* Link the issue (example PR title):

```
Fix #4.1(not exaclty 4.1 but the reel number of the issue : like for example the number of the issue 4.1 is #23 ) - Implement master registry connection

```

* Provide a short description of what was done
* Pass code reviews
* Pass CI checks

### Allowed merge method: **Squash & Merge**

This keeps history clean.

---

# 📌 4. Reviews

Every PR needs at least **1 reviewer**.

Reviewer checks:

* Code quality
* Logic correctness
* Naming consistency
* No duplicated work
* Everything matches the issue scope

---

# 📌 5. GitHub Project Board

Use the board to track progress:

Columns:

* **To Do** → All unstarted issues
* **In Progress** → Assigned + branch created
* **In Review** → PR opened
* **Done** → PR merged / Issue closed

Automation:

* When issue assigned → moves to In Progress
* When PR created → moves to In Review
* When PR merged → moves to Done

---

# 📌 6. Epic Tracking

Each EPIC is a container of smaller issues.

When a sub-issue completes:

* EPIC progress % auto-increases
* Team sees global evolution of the module

Use EPICs to coordinate multi-person tasks.

---

# 📌 7. Coding Standards

* Use meaningful variable names
* Keep methods short
* Comment complex logic
* Avoid duplicating code across modules
* Structure packages logically
* Keep config values in `config.properties`

---

# 📌 8. Communication Workflow

Every teammate should:

* Comment in issues when blocked
* Update the board daily
* Never push directly to main or develop
* Always work from an issue

---

# 📌 9. Summary

This workflow ensures:

* Zero conflicts
* Clean history
* Parallel development possible
* Clear responsibility
* Professional team coordination

Follow this document strictly to avoid chaos and ensure fast, clean progress.
