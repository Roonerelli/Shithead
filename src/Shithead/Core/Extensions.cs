﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Shithead.Core
{
    public static class Extensions
    {
        public static IEnumerable<T> AsCircularEnumerable<T>(this IEnumerable<T> enumerable)
        {
            var enumerator = enumerable.GetEnumerator();
            if (!enumerator.MoveNext())
                yield break;

            while (true)
            {
                yield return enumerator.Current;
                if (!enumerator.MoveNext())
                    enumerator = enumerable.GetEnumerator();
            }
        }

    }
}
