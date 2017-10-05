package com.bayviewglen.programmingclub;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Scanner;

public class Leaky1 {

	public static void main(String[] args) throws FileNotFoundException {
		Player[] arr = new Player[10000];
		int howMany = 0;
		Leaky1 leak = new Leaky1();
		File f = new File("data/leaky.dat");
		Scanner in = new Scanner(f);
		int num = Integer.parseInt(in.nextLine()); // in.nextInt();
		for (int i = 0; i < num; i++) {
			String x = in.nextLine();
			String a = x.split(" ")[0];
			if (a.equals("N")) {
				arr[howMany++] = leak.new Player(Integer.parseInt(x.split(" ")[1]), Integer.parseInt(x.split(" ")[2]));
			} else if (a.equals("M")) {
				for (int j = 0; j < howMany; j++) {
					if (arr[j].getID() == Integer.parseInt(x.split(" ")[1])) {
						arr[j] = leak.new Player(arr[j].getID(), Integer.parseInt(x.split(" ")[2]));
						break;
					}
				}
			} else if (a.equals("Q")) {
				Arrays.sort(arr, 0, howMany);
				System.out.println(arr[Integer.parseInt(x.split(" ")[1]) - 1].getID());
			}
		}
	}

	public class Player implements Comparable<Player>{
		int ID;

		public int getID() {
			return ID;
		}

		public void setID(int iD) {
			ID = iD;
		}

		int ranking;

		public int getRanking() {
			return ranking;
		}

		public void setRanking(int ranking) {
			this.ranking = ranking;
		}

		public Player(int ID, int ranking) {
			this.ID = ID;
			this.ranking = ranking;
		}

		public int compareTo(Player x) {
			if (x.getRanking() > ranking) {
				return 1;
			} else if (x.getRanking() < ranking) {
				return -1;
			} else {
				return 0;
			}
		}

		
	}
}
