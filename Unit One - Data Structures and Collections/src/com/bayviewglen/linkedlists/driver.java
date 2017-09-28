package com.bayviewglen.linkedlists;

public class driver {

	public static void main(String[] args) {
		LinkedList test = new LinkedList();
		display(test.toArray());
		test.add(2);

		test.add(1);
		test.add(0);
		test.add(1);
		test.add(0);

		display(test.toArray());
		System.out.println("RLO" + test.removeLastOccurrence(0));
		display(test.toArray());

	}

	// for debugging
	public static void display(int[] arr) {
		for (int x : arr) {
			System.out.print(x + ", ");
		}
		System.out.println();

	}

}
