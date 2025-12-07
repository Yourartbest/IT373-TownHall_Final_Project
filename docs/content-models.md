# Content Models (CMS Schema Plan) — Sanity

These content models reflect the data structures required for events, resources, volunteers, and community content.

---

# Model: Event
- **title** (string)  
- **description** (text)  
- **date** (datetime)  
- **location** (string)  
- **difficultyLevel** (string: beginner/intermediate/advanced)  
- **audienceTag** (string: parents, educators, youth, volunteers)  
- **whatYouWillLearn** (array of strings)  
- **image** (image)  
- **registrationOpen** (boolean)  
- **slug** (slug)

---

# Model: Blog Post
- **title**  
- **summary**  
- **body**  
- **coverImage**  
- **author** (reference to Author)  
- **publishDate**  
- **tags** (array)

---

# Model: Educator Resource
- **title**  
- **gradeLevel**  
- **fileDownload** (file)  
- **description**  
- **relatedEvents** (reference array)

---

# Model: Volunteer Guide / Task
- **title**  
- **steps** (array of text blocks)  
- **estimatedTime**  
- **skillsRequired**  
- **category** (onboarding, event-day, logistics)

---

# Model: Author (optional)
- **name**  
- **role**  
- **image**  

---
