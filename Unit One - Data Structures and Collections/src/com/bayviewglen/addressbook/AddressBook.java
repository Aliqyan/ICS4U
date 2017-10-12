package com.bayviewglen.addressbook;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Scanner;

import com.bayviewglen.trees.BinarySearchTree;
import com.bayviewglen.trees.TreeNode;

public class AddressBook {
	private BinarySearchTree bst;

	public AddressBook() {
		bst = new BinarySearchTree();
		read();
	}

	public void addContact(String lastName, String firstName, String phone) {
		bst.add(new Contact(lastName, firstName, phone));
	}

	public void removeContact(String lastName, String firstName) {
		boolean works = bst.delete(bst.getRoot(), new Contact(lastName, firstName));
		if (!works) {
			System.out.println("There is no contacts with the name " + firstName + " " + lastName + " in this Address Book!");
			return;
		}else {
			System.out.println("You have removed " + firstName + " " + lastName);

		}
	}

	public Contact searchContact(String lastName, String firstName) {
		TreeNode temp = bst.search(bst.getRoot(), new Contact(lastName, firstName));
		if (temp == null) {
			return null;
		}
		return temp.getContact();
	}

	public void displaySpecificContact(String lastName, String firstName) {
		Contact contact = searchContact(lastName, firstName);
		if (contact == null) {
			System.out.println("This contact does not exist!");
		} else {
			System.out.println(contact);
		}

	}

	public void displayAllContacts() {
		if (bst.getRoot() == null) {
			System.out.println("There are no contacts in your Address Book!");
		} else {
			bst.inorderTaversal(bst.getRoot());
		}

	}

	public void exit() {
		try {
			BufferedWriter bw = new BufferedWriter(new FileWriter("data/contacts.dat"));
			bst.write(bst.getRoot(), bw);
			bw.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		System.out.println("Thank you for using the Tapia Contact Holder!");
		System.out.println("Cheerio!");

	}

	
	public void read() {
		try {
			Scanner input = new Scanner(new File("data/contacts.dat"));
			while (input.hasNextLine()) {
				String line = input.nextLine();
				addContact(line.split(",")[0].trim(), line.split(",")[1].trim(), line.split(",")[2].trim());
			}
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
