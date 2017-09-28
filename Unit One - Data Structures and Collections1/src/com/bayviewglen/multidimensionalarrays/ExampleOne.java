package com.bayviewglen.multidimensionalarrays;

public class ExampleOne {

	public static void main(String[] args) {
		char[][] words = new char[3][];
		words[0] = "Cipher".toCharArray();
		words[1] = "hiccup".toCharArray();
		words[2] = "yolo".toCharArray();
		words[1] = words[2]; // we did not change the size of the array, we only pointed it to a new array


		for(char[] arr: words) {
			for(char i : arr) {
				System.out.print(i);
			}
			System.out.println();
		}
		
		//for each loop does not change the actual
	}

}
