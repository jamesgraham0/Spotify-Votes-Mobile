# Testing

- **Convert to Typescript for type-checking safety**
- **ESLint**
- **Jest** testing framework for:
    - Snapshot testing
    - E2E testing

### Snapshot Testing

- Will be done on all of the static components on mount.
- Interacting with every element on the page to ensure correct UI changes.
- Comparing the current snapshot with the stored snapshot to identify any unexpected changes.
- Updating the snapshot when the UI changes are intentional and confirmed.
- Automating snapshot tests to run during the continuous integration process.

### End-to-end Testing

- Testing the integration of the application with other services
- Checking the appropriate output in response to the input
- Testing the application in real-world scenarios like network failures or restarting the server

### **Integration Testing**

- **Testing Service Integration:** Ensuring that the application integrates well with Spotify’s API, checking for proper communication and data exchange.

### **Performance Testing**

- **Load Testing:** Assessing the application's performance under expected user loads to identify potential bottlenecks and areas for optimization.
- **Stress Testing:** Pushing the system beyond its normal operational capacity to assess its behavior under extreme conditions and to identify failure points.

### **Security Testing**

- **Vulnerability Scanning:** Scanning the application for known vulnerabilities and security issues.
- **Penetration Testing:** Simulating real-world attacks to identify potential weaknesses in the application's security defenses.

### **Compatibility Testing**

- **Device Compatibility:** Ensuring the application works seamlessly on different devices and screen sizes.

### **Regression Testing**

- **Automated Regression Tests:** Creating and running automated tests to verify that existing features remain unaffected after new code changes.
- **Continuous Integration:** Integrating regression tests into the continuous integration process to catch issues early in the development lifecycle.

### **Usability Testing**

- **User Feedback:** Collecting feedback from real users to understand their experience and identifying areas for enhancement.
- **User Interface Testing:** Ensuring that the application's interface is intuitive, consistent, and aligns with user expectations.