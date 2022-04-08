#!/bin/bash
# CSV to JSON converter using BASH
# Usage ./csv2json input.csv > output.json
# Copied from https://gist.github.com/DecisionNerd/3de707bc656cf757a0cb

input=$1

[ -z "$1" ] && echo "No CSV input file specified" && exit 1
[ ! -e "$input" ] && echo "Unable to locate $1" && exit 1

read first_line < "$input"
IFS=':' read -a head_array <<< "$first_line"
headings=${#head_array[@]}
lines=`cat "$input" | wc -l`

c=0
printf "%b\n" "{\n\t \"Salar\": ["

while [ "$c" -lt "$lines" ]
do
        read each_line
        if [ $c -ne 0 ]; then
                d=0
                printf '%b\n' '\t{'
                while [ $d -lt "$headings" ]
                do
                        IFS=':' read -a each_element <<< "$each_line"
                        if [ $d -ne $(($headings-1)) ]; then
                                if [ -z "${each_element[$d]}" ] ; then
                                    each_element[$d]="null"
                                    printf "%b\n" "\t\t\"${head_array[$d]}\" : ${each_element[$d]},\n"
                                else
                                      printf "%b\n" "\t\t\"${head_array[$d]}\" : \"${each_element[$d]}\",\n"
                                fi
                        else
                                if [ -z "${each_element[$d]}" ] ; then
                                    each_element[$d]="null"
                                    printf "%b\n" "\t\t\"${head_array[$d]}\" : ${each_element[$d]}\n"
                                else
                                      printf "%b\n" "\t\t\"${head_array[$d]}\" : \"${each_element[$d]}\"\n"
                                fi
                        fi
                        d=$(($d+1))
                done
                if [ $c -eq $(($lines-1)) ]; then
                        printf "%b\n" "\n\t}"
                else
                        printf "%b\n" "\t},"
                fi
        fi
        c=$(($c+1))
done < "$input"
printf "%b\n" "\t]\n}"
