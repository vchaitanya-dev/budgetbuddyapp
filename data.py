import sqlite3
def print_table( table_name):
    # Connect to the SQLite database
    conn = sqlite3.connect("./mySQLiteDb.db")
    
    try:
        # Create a cursor object
        cursor = conn.cursor()
        
        # Execute a query to fetch all rows from the specified table
        query = f"SELECT * FROM {table_name}"
        cursor.execute(query)
        
        # Fetch all rows from the execudted query
        rows = cursor.fetchall()
        
        # Get the column names from the cursor description
        column_names = [description[0] for description in cursor.description]
        
        # Print the column names
        print(" | ".join(column_names))
        print("-" * (len(" | ".join(column_names))))
        
        # Print each row
        for row in rows:
            print(" | ".join(map(str, row)))
    
    except sqlite3.Error as e:
        print(f"An error occurred: {e}")
    
    finally:
        # Close the connection to the database
        conn.close()

# Example usage
# db_file = './mySQLDb.db'  # Path to your SQLite database file
table_name = 'Categories' # Name of the table you want to print
print_table(table_name)


# def run_multiple_commands(db_file):
#     # Connect to the SQLite database
#     conn = sqlite3.connect(db_file)
    
#     try:
#         # Create a cursor object
#         cursor = conn.cursor()
#         cursor.execute('''
#     DELETE FROM my_table
#     WHERE category = ?
# ''', ("दिवाली उत्सव"))
        
# #         # SQL commands to execute
# #         commands = [
# #         # "CREATE TABLE IF NOT EXISTS Categories (id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT NOT NULL,  type TEXT NOT NULL CHECK (type IN ('खर्च', 'आय')));",
# #          #"CREATE TABLE IF NOT EXISTS Transactions (id INTEGER PRIMARY KEY AUTOINCREMENT,category_id INTEGER,amount REAL NOT NULL, date INTEGER NOT NULL,  description TEXT,type TEXT NOT NULL CHECK (type IN ('खर्च', 'आय')),FOREIGN KEY (category_id) REFERENCES Categories (id));"
# # #"INSERT INTO Categories (name, type) VALUES ('उपयोगिताओं', 'खर्च');"
# # # "INSERT INTO Categories (name, type) VALUES ('इलेक्ट्रानिक्स', 'खर्च');",
# # # "INSERT INTO Categories (name, type) VALUES ('बाहर खाएं', 'खर्च');",
# # # "INSERT INTO Categories (name, type) VALUES ('नाश्ता', 'खर्च');",
# # # "INSERT INTO Categories (name, type) VALUES ('निजी उत्पाद', 'खर्च');",
# # # "INSERT INTO Categories (name, type) VALUES ('दिवाली उत्सव', 'खर्च');",
# # # "INSERT INTO Categories (name, type) VALUES ('नए साल का उत्सव', 'खर्च');",
# # # "INSERT INTO Categories (name, type) VALUES ('उगादी उत्सव', 'खर्च');",
# # # "INSERT INTO Categories (name, type) VALUES ('निजी उत्पाद', 'खर्च');",
# # # "INSERT INTO Categories (name, type) VALUES ('घरेलू सामान', 'खर्च');",
# # # "INSERT INTO Categories (name, type) VALUES ('वेतन', 'आय');",
# # # "INSERT INTO Categories (name, type) VALUES ('बोनस', 'आय');"
# # #  "INSERT INTO Categories (name, type) VALUES ('परामर्श कार्य', 'आय');",
# # # "INSERT INTO Categories (name, type) VALUES ('अंशकालिक नौकरी', 'आय');",
# # # "select * from Categories;",
# # # "INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (1, 1000, 1709814000, 'साप्ताहिक किराने का सामान', 'खर्च');",
# # # "INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (1, 2000, 1709900400, 'अधिक किराने का सामान', 'खर्च');",
# # # "INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (2, 5000, 1707740400, 'मासिक किराया', 'खर्च');",
# # # "INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (1, 700, 1710082800, 'नाश्ता और पेय', 'खर्च');",


# # # "INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (3, 30000, 1709914800, 'मासिक वेतन', 'आय');",
# # # "INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (4, 4000, 1710001200, 'फ्रीलांस प्रोजेक्ट', 'आय');",


# # # "INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (1, 500, 1707154800, 'नाश्ते का सामान', 'खर्च');",
# # # "INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (1, 3000, 1707241200, 'घरेलू सामान', 'खर्च');",
# # # "INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (2, 400, 1707327600, 'उपयोगिता बिल', 'खर्च');",
# # # "INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (1, 6000, 1707414000, 'इलेक्ट्रानिक्स', 'खर्च');",
# # # "INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (1, 1000, 1707500400, 'बाहर खाएं', 'खर्च');",


# # # "INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (3, 6000, 1707266800, 'बक्शीश', 'आय');",
# # # "INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (4, 4000, 1707353200, 'परामर्श कार्य', 'आय');",
# # # "INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (3, 10000, 1707439600, 'अंशकालिक नौकरी', 'आय');",
# # # "select * from Transactions;"
# #         ]
        
# #         # Execute each command
# #         for command in commands:
# #             cursor.execute(command)
        
# #         # Commit the transaction
# #         conn.commit()
# #         print("Commands executed and committed successfully.")
    
#     except sqlite3.Error as e:
#         # Print any error that occurs
#         print(f"An error occurred: {e}")
    
#     finally:
#         # Close the connection
#         conn.close()

# # Example usage
# db_file = 'mySQLiteDb.db'  # Path to your SQLite database file
# run_multiple_commands(db_file)