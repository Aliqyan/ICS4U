package com.bayviewglen.dpassignment;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Scanner;

public class ContiguousSequence {
	public static void main(String[] args) {
		read();
	}

	public static void read() {
		try {
			Scanner in = new Scanner(new File("data/ContiguousSequence.dat"));
			int t = in.nextInt();
			for (int i = 0; i < t; i++) {
				int n = in.nextInt();
				int[] seq = new int[n];
				for (int j = 0; j < n; j++) {
					seq[j] = in.nextInt();
				}
				solve(seq);
			}
			in.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}

	}
	
	public static void solve(int[] seq) {
		int actualMax = 0;
		int[] soln = new int[seq.length];
		soln[0] = seq[0];
		actualMax = Math.max(soln[0], 0);
		for (int i = 1; i < soln.length; i++) {
			soln[i] = Math.max(soln[i-1] + seq[i], seq[i]);
			actualMax = Math.max(soln[i], actualMax);
		}
		System.out.println(actualMax);
	}

	
}