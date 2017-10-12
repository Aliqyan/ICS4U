package com.bayviewglen.addressbook;

import java.util.Scanner;


public class AddressBookDriver {


	public static void main(String[] args) {

		AddressBook addressBook = new AddressBook();
		/*
		addressBook.addContact("cricket", "charles", "1");
		addressBook.addContact("bird", "bob", "1");
		addressBook.addContact("burr", "bob", "1");
		addressBook.addContact("at", "alex", "1");
		addressBook.addContact("duncan", "david", "1");
		addressBook.addContact("david", "yoolo", "1");
		addressBook.addContact("eler", "ernest", "1");
		
		System.out.println("*******************************************************************************************************************************************************");
		addressBook.displayAllContacts();
		System.out.println("*******************************************************************************************************************************************************");
		System.out.print("1) ");
		addressBook.removeContact("at" , "alex");
		
		System.out.println("*******************************************************************************************************************************************************");
		addressBook.displayAllContacts();
		System.out.println("*******************************************************************************************************************************************************");
		System.out.print("2) ");
		addressBook.removeContact("bird" , "bob");
		
		System.out.println("*******************************************************************************************************************************************************");
		addressBook.displayAllContacts();
		System.out.println("*******************************************************************************************************************************************************");
		System.out.print("3) ");
		addressBook.removeContact("eler" , "ernest");
		System.out.println("*******************************************************************************************************************************************************");
		addressBook.displayAllContacts();
		System.out.println("*******************************************************************************************************************************************************");
		addressBook.displaySpecificContact("cricket", "charles");
		addressBook.displaySpecificContact("bird", "bob");
		addressBook.displaySpecificContact("burr", "bob");
		addressBook.displaySpecificContact("at", "alex");
		addressBook.displaySpecificContact("duncan", "david");
		addressBook.displaySpecificContact("david", "yoolo");
		addressBook.displaySpecificContact("eler", "ernest");
		


		System.out.println("*******************************************************************************************************************************************************");
		addressBook.displayAllContacts();
		System.out.println("*******************************************************************************************************************************************************");

		addressBook.removeContact("cricket", "charles");

		System.out.println("*******************************************************************************************************************************************************");
		addressBook.displayAllContacts();
		System.out.println("*******************************************************************************************************************************************************");
		addressBook.addContact("zeus", "bolt", "100");

		System.out.println("*******************************************************************************************************************************************************");
		addressBook.displayAllContacts();
		System.out.println("*******************************************************************************************************************************************************");
		addressBook.displaySpecificContact("zeus", "bolt");

		System.out.println("*******************************************************************************************************************************************************");
		addressBook.displayAllContacts();
		System.out.println("*******************************************************************************************************************************************************");
*/
		
		System.out.println("Welcome to the extravagant AddressBook!");
		Scanner keyboard = new Scanner(System.in);
		boolean loop = true;
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

			} else {
				System.out.println("Please enter a valid choice...");
			}
		}
		


	}
}
