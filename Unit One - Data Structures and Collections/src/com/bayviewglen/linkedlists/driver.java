package com.bayviewglen.linkedlists;

public class driver {

	public static void main(String[] args) {
		LinkedList test = new LinkedList();
		display(test.toArray());
		test.add(0, 3);
		display(test.toArray());

		test.add(2);
		display(test.toArray());

		System.out.println("r" + test.size());

		test.add(22);
		test.add(2);
		test.add(2);
		test.add(22);
		test.add(2);

		display(test.toArray());
		System.out.println("r" + test.contains(32));

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
