package com.bayviewglen.dpassignment;

import java.util.Arrays;

public class BadNeighbour {

	public static void main(String[] args) {
		int[] don = {10, 3, 2, 5, 7, 8};//{ 10, 9, 8, 5, 6, 20 };
		int[] sol1 = new int[don.length - 1];
		int[] sol2 = new int[don.length - 1];

		for (int i = 0; i < don.length - 1; i++) {
			int j = don.length - 1 - i;
			sol1[i] = don[i];
			sol2[i] = don[j];
			if (i > 1) {
				sol1[i] = Math.max(sol1[i], sol1[i - 2] + don[i]);
				sol2[i] = Math.max(sol2[i], sol2[i - 2] + don[j]);
			}
			if (i > 2) {
				sol1[i] = Math.max(sol1[i], sol1[i - 3] + don[i]);
				sol2[i] = Math.max(sol2[i], sol2[i - 3] + don[j]);
			}
		}
		// for debugging
		display(sol1);
		display(sol2);
		// answer
		System.out.println(Math.max(sol1[sol1.length - 1], sol2[sol1.length - 1]));

	}

	// debugging
	public static void display(int[] x) {
		for (int i = 0; i < x.length; i++) {
			System.out.print(x[i] + ", ");
		}
		System.out.println();
	}

}
