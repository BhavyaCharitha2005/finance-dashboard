---

## 🔐 Role Based UI Guide

| Feature | Viewer | Admin |
|---|---|---|
| View Dashboard | ✅ | ✅ |
| View Transactions | ✅ | ✅ |
| View Insights | ✅ | ✅ |
| Add Transaction | ❌ | ✅ |
| Edit Transaction | ❌ | ✅ |
| Delete Transaction | ❌ | ✅ |

To switch roles use the dropdown in the top right corner of the header.

---

## 📊 Mock Data

The app uses realistic mock data covering:
- **16 months** of transactions (January 2025 to April 2026)
- **84 transactions** total
- Mix of Salary, Freelance income and various expense categories
- Realistic Indian Rupee (₹) amounts
- Categories include Food, Rent, Transport, Entertainment, Healthcare, Shopping, Utilities, Freelance and Salary

---

## 🤔 Technical Decisions and Trade-offs

### Why Zustand over Redux?
Zustand requires significantly less boilerplate code while providing the same functionality. For a project of this scale, Redux would be over-engineering. Zustand is also the current industry trend for React state management.

### Why Recharts over Chart.js?
Recharts is built specifically for React and uses React components natively. This makes it much easier to integrate and customize compared to Chart.js which requires imperative DOM manipulation.

### Why Vite over Create React App?
Vite offers significantly faster development server startup and hot module replacement. Create React App is no longer actively maintained and Vite is the current industry standard.

### Mock Data vs Backend
Since this is a frontend evaluation, all data is mocked locally. The architecture is designed so that replacing mock data with real API calls would require minimal changes — only the data layer in mockData.ts and store actions would need to be updated.

### TypeScript
TypeScript was chosen to demonstrate code quality and type safety. All components, store state and data models are fully typed which prevents runtime errors and improves developer experience.

---

## 👩‍💻 Author

**Bhavya Charitha**
- GitHub: [@BhavyaCharitha2005](https://github.com/BhavyaCharitha2005)

---

## 📝 License

This project is built for evaluation purposes.
