package com.bayviewglen.dpassignment;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class BadNeighbour {

	public static void main(String[] args) {
		read();
	}

	public static void read() {
		try {
			Scanner in = new Scanner(new File("data/BadNeighbour.dat"));
			int t = in.nextInt();
			for (int i = 0; i < t; i++) {
				int n = in.nextInt();
				int[] don = new int[n];
				for (int j = 0; j < n; j++) {
					don[j] = in.nextInt();
				}
				solve(don);
			}

			in.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}

	}

	public static void solve(int[] don) {
		if (don.length > 1) {
			int[] sol1 = new int[don.length - 1];
			int[] sol2 = new int[don.length - 1];
			sol1[0] = don[0];
			sol2[0] = don[don.length - 1];
			for (int i = 1; i < don.length - 1; i++) {
				int j = don.length - 1 - i;
				sol1[i] = Math.max(sol1[i - 1], don[i]);
				sol2[i] = Math.max(sol2[i - 1], don[j]);

				if (i > 1) {
					sol1[i] = Math.max(sol1[i], sol1[i - 2] + don[i]);
					sol2[i] = Math.max(sol2[i], sol2[i - 2] + don[j]);
				}
				if (i > 2) {
					sol1[i] = Math.max(sol1[i], sol1[i - 3] + don[i]);
					sol2[i] = Math.max(sol2[i], sol2[i - 3] + don[j]);
				}
			}

			System.out.println(Math.max(sol1[sol1.length - 1], sol2[sol2.length - 1]));
		} else {
			System.out.println(don[0]);
		}

	}

	// debugging
	public static void display(int[] x) {
		for (int i = 0; i < x.length; i++) {
			System.out.print(x[i] + ", ");
		}
		System.out.println();
	}

}
