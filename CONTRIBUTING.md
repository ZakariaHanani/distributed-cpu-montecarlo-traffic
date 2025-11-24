# CONTRIBUTING GUIDELINES

Thank you for contributing to this project.
Please read and follow these rules carefully to keep the workflow clean and professional.

---

# 📌 1. Branching Rules

### ✔ Main branches

```
main      → stable production
develop   → main development branch
```

### ✔ Feature branches

Each issue = one branch.
Naming:

```
feature/<issue-number>-short-description
```

Examples:

```
feature/4.1-master-registry
feature/9.3-reassign
feature/21.2-flow-calculation
```

### ⚠️ Never push directly to `main` or `develop`.

All changes MUST go through Pull Requests.

---

# 📌 2. Commit Message Rules

We use **Conventional Commits**.

Format:

```
<type>: <description>
```

Types:

* `feat` → new feature
* `fix` → bug fix
* `docs` → documentation changes
* `test` → tests only
* `chore` → maintenance / config
* `refactor` → non-functional code change

Examples:

```
feat: add worker heartbeat system
fix: handle missing registry connection
chore: update config loader
```

---

# 📌 3. Issue Rules

Every task MUST have an issue.
Each issue must contain:

* clear description
* acceptance criteria
* labels
* assigned developer

### One issue = one feature branch = one pull request.

---

# 📌 4. Pull Request (PR) Rules

### PR Title format:

```
Fix #<issue-number> - <short description>
```

Examples:

```
Fix #4.1 - Connect master to registry
Fix #9.3 - Reassign tasks from offline worker
```

### PR Requirements:

* Small and focused (DO NOT mix tasks)
* Linked to the issue it solves
* Clear description of what changed
* CI must pass (if enabled)
* At least **1 reviewer approval**

### Allowed merge method:

**Squash and Merge**
(to keep history clean)

---

# 📌 5. Code Quality Rules

* Use meaningful variable and method names
* Keep methods short
* Avoid duplicated logic
* Document complex parts of the code
* Follow project package structure
* All configs MUST be in `config.properties`

---

# 📌 6. Testing Rules

Before merging any code:

* Ensure it compiles with Maven
* Run all tests
* Add tests for logic-heavy features
* Do not break existing functionality

---

# 📌 7. Project Board Rules

We use a GitHub Project board with:

* **To Do**
* **In Progress**
* **In Review**
* **Done**

### Workflow:

* When you take an issue → move it to *In Progress*
* When you open a PR → moves to *In Review*
* When PR is merged → issue moves to *Done*

Always keep the board updated.

---

# 📌 8. Communication Rules

* Comment on issues when blocked
* Ping reviewers politely
* Ask questions inside the issue or PR (not in private)
* Keep discussions clean and technical

---

# 📌 9. Documentation Rules

Any feature that adds behavior must update:

* `/docs/...` files
* `README.md` if necessary

---

# 📌 10. Final Notes

Following these rules ensures:

* No merge conflicts
* Clean commit history
* Faster development
* Smooth teamwork
* Professional workflow

Thank you for contributing 🙏
