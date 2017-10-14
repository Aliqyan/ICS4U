package com.bayviewglen.addressbook;

import java.util.Scanner;

public class AddressBookDriver {

	public static void main(String[] args) {
		Scanner keyboard = new Scanner(System.in);
		AddressBook addressBook = new AddressBook();
		boolean loop = true;

		System.out.println("Welcome to the extravagant AddressBook!");
		while (loop) {

			System.out.print("\nType 1 to add, 2 to delete, 3 to search, 4 to show address book, 0 to quit: ");
			String choice = keyboard.nextLine();

			if (choice.equals("1")) {
				System.out.print("What is their first name? : ");
				String firstName = keyboard.nextLine().toLowerCase().trim();

				System.out.print("What is their last name? : ");
				String lastName = keyboard.nextLine().toLowerCase().trim();

				System.out.print("What is their phone number? : ");
				String phone = keyboard.nextLine();

				addressBook.addContact(lastName, firstName, phone);

			} else if (choice.equals("2")) {
				System.out.print("What is their first name? : ");
				String firstName = keyboard.nextLine().toLowerCase().trim();

				System.out.print("What is their last name? : ");
				String lastName = keyboard.nextLine().toLowerCase().trim();

				addressBook.removeContact(lastName, firstName);

			} else if (choice.equals("3")) {
				System.out.print("What is their first name? : ");
				String firstName = keyboard.nextLine().toLowerCase().trim();

				System.out.print("What is their last name? : ");
				String lastName = keyboard.nextLine().toLowerCase().trim();

				addressBook.displaySpecificContact(lastName, firstName);

			} else if (choice.equals("4")) {
				addressBook.displayAllContacts();
			} else if (choice.equals("0")) {
				loop = false;
				addressBook.exit();
				keyboard.close();
			} else {
				System.out.println("Please enter a valid choice...");
			}
		}

	}
}
