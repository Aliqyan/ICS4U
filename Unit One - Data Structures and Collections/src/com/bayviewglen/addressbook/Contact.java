package com.bayviewglen.addressbook;

public class Contact implements Comparable<Contact>{
	private String lname;
	private String fname;
	private String phone;
	public Contact() {
	
	}
	
	public Contact(String lname, String fname, String phone) {
		super();
		this.lname = lname;
		this.fname = fname;
		this.phone = phone;
	}
	
	public Contact(String lname, String fname) {
		super();
		this.lname = lname;
		this.fname = fname;
		this.phone = phone;
	}
	

	public String getLname() {
		return lname;
	}
	public void setLname(String lname) {
		this.lname = lname;
	}
	public String getFname() {
		return fname;
	}
	public void setFname(String fname) {
		this.fname = fname;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}	
	public String toString() {
		return lname + ", " + fname + ", " + phone;
	}

	public int compareTo(Contact other) {
		int result1 = (lname).compareToIgnoreCase(other.getLname());
		if(result1 == 0) {
			return (fname).compareToIgnoreCase(other.getFname());
		}else {
			return result1;
		}
	}
	
	public boolean equals(String lname, String fname) {
		return(this.lname.equals(lname) && this.fname.equals(fname));
	}
	
	public boolean equals(Contact other) {
		return(lname.equals(other.getLname()) && fname.equals(other.getFname()));
	}
	
	public int compareTo(String lname, String fname) {
		int result1 = (this.lname).compareToIgnoreCase(lname);
		if(result1 == 0) {
			int result2= (this.fname).compareToIgnoreCase(fname);
			System.out.println("c" + result2);
			return (this.fname).compareToIgnoreCase(fname);
		}else {
			System.out.println("c" + result1);
			return result1;
		}
	}
	

}