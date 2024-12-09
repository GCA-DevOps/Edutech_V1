Preview: ElimuPay - Edutech Project

Project Overview:
ElimuPay is a robust school payment engine application designed to streamline financial transactions between school administration and it's stakeholders ie parents and service providers. It is available in two forms: a web app for school administration and a mobile app for parents. ElimuPay enhances financial transparency, reduces administrative overhead, and provides a seamless payment experience.

ElimuPay Web App:
Available via web browser, the web app is tailored for school administration with the following features:

1. Track Payments:
   - Monitor payments into operational accounts with a primary focus on school fees collection.
   - Separate and track collections based on terms, grades, streams, and individual students.

2. Differentiate Income Sources:
   - Distinguish school fees from other income sources like venue hire, bus hire, and other investments.

3. Manage Expenditures:
   - Track all outgoing payments including salaries, overheads, utilities, and statutory/legal obligations.
   - Mitigate fraud and misappropriation of financial resources, enhancing financial integrity.

4. Financial Reporting:
   - Generate financial reports and comparisons on expenses and income.
   - Conduct self-audits and score financial health to support sound financial decision-making.

5. Payment Acknowledgements:
   - Send out payment acknowledgements and generate receipts.

6. Arrears Reminders:
   - Send fee arrears reminders to parents.

ElimuPay Mobile App:
Available on the Android platform, the mobile app provides parents with the following features:

1. View Fees Obligations:
   - View students' fee obligations, including subscribed categories and balances.

2. Payment History:
   - View and export payment history statements.

3. Make Payments:
   - Pay school fees via integrated payment gateways.

4. Installment Plans:
   - Set up installment plans for distributed fee payments.

5. Payment Receipts:
   - View and export payment receipts.

Technology Stack:

Frontend Technologies:
Languages:Angular, HTML, CSS.
Development Tools:
  - Visual Studio Code (VS Code) IDE
  - Node.js
  - Angular CLI

Backend Technologies:
Languages:Python 3 or above
Development Tools:
  - PyCharm
  - XAMPP
  - Git (for cloning the project repository)

Setup Instructions:

Frontend Setup:
1. Download and install VS Code IDE.
2. Install Node.js.
3. Install Angular CLI using the command:
   ```
   npm install -g @angular/cli
   ```
4. Clone the frontend project repository.
5. Navigate to the project directory and run:
   ```
   ng serve
   ```

Backend Setup:
1. Download and install PyCharm.
2. Download and install XAMPP.
3. Clone the backend project repository.
4. Create a database (edutech_payments_db) using XAMPP.
5. Create a virtual environment in the project directory using:
   ```
  	 python -m venv venv
   ```
6. Activate the virtual environment and install dependencies:
   ```
	.\venv\Scripts\activate

  	 pip install -r requirements.txt
   ```
7. Run database migrations:
   ```
   	python manage.py makemigrations
  	 python manage.py migrate
   ```
8. Start the development server:
   ```
  	 python manage.py runserver
   ```

ElimuPay is designed to provide a comprehensive and user-friendly solution for school payment management, ensuring transparency, efficiency, and convenience for both school administrations and parents.


