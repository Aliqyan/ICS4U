package com.bayviewglen.dpassignment;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class ZigZag {

	public static void main(String[] args) {
		read();
	}

	public static void read() {
		try {
			Scanner in = new Scanner(new File("data/ZigZag.dat"));
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
		if (seq.length >= 2) {
			// tracks count for each subsequence from 0 to index i.e count [1] holds the max
			// zig zag from [0, 1] of seq
			int[] count = new int[seq.length];
			boolean isSame = seq[1] - seq[0] == 0;
			boolean isUp = (seq[1] - seq[0] > 0);
			count[0] = 1;
			
			for (int i = 1; i < seq.length; i++) {
				int diff = (seq[i] - seq[i - 1]);
				if(isSame && diff != 0) {
					isUp = diff > 0;
					isSame = false;
				}
				if (diff != 0 && (diff > 0 == isUp)) {
					isUp = !isUp;
					count[i] = ++count[i - 1];
				} else {
					count[i] = count[i - 1];
				}
			}
			
			System.out.println(count[count.length - 1]);
		} else {
			System.out.println(seq.length);
		}
	}
}