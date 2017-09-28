package com.bayviewglen.arrays;

import java.io.IOException;
import java.util.Scanner;

public class AddressBookDriver {

	public static void main(String[] args) {

		AddressBook addressBook = new AddressBook();
		Scanner keyboard = new Scanner(System.in);
		boolean loop = true;
		while (loop) {
			System.out.println("Type 1 to add, 2 to delete, 3 to search, 4 to show address book, 0 to quit");
			String choice = keyboard.nextLine();
			if (choice.equals("1")) {
				System.out.println("What is their first name?");
				String firstName = keyboard.nextLine().toUpperCase().trim();
				System.out.println("What is their last name?");
				String lastName = keyboard.nextLine();
				System.out.println("What is their phone number?");
				String phone = keyboard.nextLine();
				addressBook.addContact(lastName, firstName, phone);
			} else if (choice.equals("2")) {
				System.out.println("What is their last name?");
				String lastName = keyboard.nextLine();
				System.out.println("What is their first name?");
				String firstName = keyboard.nextLine();
				addressBook.removeContact(lastName, firstName);
			} else if (choice.equals("3")) {
				System.out.println("What is their last name?");
				String lastName = keyboard.nextLine();
				System.out.println("What is their first name?");
				String firstName = keyboard.nextLine();
				addressBook.displaySpecificContact(lastName, firstName);
			} else if (choice.equals("4")) {
				addressBook.displayAllContacts();
			} else if (choice.equals("0")) {
				loop = false;
				addressBook.exit();

			} else {
				System.out.println("Please enter a valid choice...");
			}
		}

	}
}
