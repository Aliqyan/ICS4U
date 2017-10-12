package com.bayviewglen.addressbook;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Arrays;
import java.util.Scanner;

import com.bayviewglen.trees.BinarySearchTree;
import com.bayviewglen.trees.TreeNode;

public class AddressBook {
	private BinarySearchTree bst;
	int numContacts = 0;

	public AddressBook() {
		bst = new BinarySearchTree();
		//read();
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
		numContacts--;
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
			System.out.println("PreO");
			bst.preOrderTaversal(bst.getRoot());
			System.out.println();
			System.out.println("InO");
			bst.inorderTaversal(bst.getRoot());
			System.out.println();
			System.out.println("PostO");
			bst.postOrderTaversal(bst.getRoot());
		}

	}

	/*public void exit() {
		FileWriter fw;
		try {
			fw = new FileWriter(new File("data/contacts.dat"));
			fw.write(numContacts + "\n");
			for (int i = 0; i < numContacts; i++) {
				fw.write(contacts[i].getLname() + "_" + contacts[i].getFname() + "_" + contacts[i].getPhone() + "\n");
			}
			fw.close();
		} catch (IOException e) {
			e.printStackTrace();
		}

		System.out.println("Thank you for using the Tapia Contact Holder!");
		System.out.println("Cheerio!");

	}
	*/
	
	public void read() {
		try {
			Scanner input = new Scanner(new File("data/contacts.dat"));
			while (input.hasNextLine()) {
				String line = input.nextLine();
				addContact(line.split("_")[0], line.split("_")[1], line.split("_")[2]);
			}
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
