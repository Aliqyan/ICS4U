package com.bayviewglen.addressbook;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Arrays;
import java.util.Scanner;

import com.bayviewglen.trees.BinarySearchTree;


public class AddressBook {
	private BinarySearchTree bst;
	//private int numContacts;
	public AddressBook() {
		bst = new BinarySearchTree();
		read();


	}
	
	
	public void addContact(String lastName, String firstName, String phone) {
		bst.add(new Contact(lastName, firstName, phone));
	}
	
	public void removeContact(String lastName, String firstName) {
		//TODO
		if(numContacts == 0) {
			System.out.println("There are no contacts in this book");
			return;
		}
		int index = searchContact(lastName, firstName);
		if(index == -1) {
			System.out.println("There is no contacts with than name in this book");
			return;
		}
		for(int i = index; i<numContacts;i++) {
			contacts[i] = contacts[i+1];
		}
		numContacts--;
	}
	
	public int searchContact(String lastName, String firstName) {
		for(int i = 0; i < numContacts ;i++) {
			if(contacts[i].equals(lastName, firstName) ) {
				return i;
			}
		}
		return -1;
	}
	
	public void displaySpecificContact(String lastName, String firstName) {
		int index = searchContact(lastName, firstName);
		if(index == -1) {
			System.out.println("This contact does not exist!");
		}
		System.out.println(contacts[index]);
		
	}
	
	public void displayAllContacts() {
		if(numContacts == 0) {
			System.out.println("No contacts in the contact book");
		}
		System.out.println();

		for(int i = 0; i < numContacts; i++) {
			System.out.println(contacts[i]);
		}
		
	}
	
	public void exit() {
		FileWriter fw;
		try {
			fw = new FileWriter(new File("data/contacts.dat"));
			fw.write(numContacts + "\n");

			for(int i= 0; i<numContacts; i++) {
				fw.write(contacts[i].getLname() + "_" + contacts[i].getFname() + "_" + contacts[i].getPhone() + "\n");
			}			
			fw.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		
		System.out.println("Thank you for using the Tapia Contact Holder!");
		System.out.println("Cheerio!");

	}
	
	public void read() {
		try {
			Scanner input = new Scanner(new File("data/contacts.dat"));
			numContacts = Integer.parseInt(input.nextLine());
			for(int i= 0; i<numContacts; i++) {
				String line = input.nextLine(); 
				contacts[i] = new Contact(line.split("_")[0], line.split("_")[1], line.split("_")[2]);
			}
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
}
